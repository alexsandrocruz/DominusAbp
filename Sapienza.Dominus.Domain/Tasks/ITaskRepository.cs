using System;
using Volo.Abp.Domain.Repositories;

namespace Sapienza.Dominus.Tasks;

public interface ITaskRepository : IRepository<Dominus.Tasks.Task, Guid>
{
}
